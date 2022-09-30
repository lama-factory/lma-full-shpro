import { FulfillmentService } from "medusa-interfaces";
import Shippy from "../utils/shippy";

class ShippyFulfillmentService extends FulfillmentService {
  static identifier = "shippy";

  constructor({ logger, orderService }, options) {
    super();

    this.options_ = options;

    /** @private @const {logger} */
    this.logger_ = logger;

    this.orderService_ = orderService;

    /** @private @const {AxiosClient} */
    this.client_ = new Shippy({
      apiKey: this.options_.api_key,
    });
  }

  registerInvoiceGenerator(service) {
    if (typeof service.createInvoice === "function") {
      this.invoiceGenerator_ = service;
    }
  }

  async getFulfillmentOptions() {
    const rates = await this.client_.shippingRates.list();

    this.logger_.warn(rates);
    const carriers = rates.Carriers;
    const options = [];
    Object.keys(carriers).forEach((carrier) => {
      carriers[carrier].forEach((option) => {
        options.push({
          id: option.Label,
          shippy_id: option.CarrierID,
          name: option.Label + " - " + option.CarrierService,
          service_name: option.CarrierService,
          require_drop_point: false,
          carrier_id: option.CarrierID,
          is_return: false,
          logo: option.CarrierLogo,
        });
      });
    });
    this.logger_.warn(options);
    return options;
  }

  async validateFulfillmentData(optionData, data, _) {
    if (optionData.require_drop_point) {
      if (!data.drop_point_id) {
        throw new Error("Must have drop point id");
      } else {
        // TODO: validate that the drop point exists
      }
    }

    return {
      ...optionData,
      ...data,
    };
  }

  async validateOption(data) {
    // const rate = await this.client_.shippingRates
    //   .retrieve(data.shippy_id)
    //   .catch(() => undefined);
    // return !!rate;
    return true;
  }

  canCalculate() {
    // Return whether or not we are able to calculate dynamically
    return false;
  }

  calculatePrice() {
    // Calculate prices
  }

  async createFulfillment(
    methodData,
    fulfillmentItems,
    fromOrder,
    fulfillment
  ) {
    const existing = fromOrder.metadata && fromOrder.metadata.shippy_order_id;

    let shippyOrder;
    if (existing) {
      shippyOrder = await this.client_.orders.retrieve(existing);
    }

    const { shipping_address } = fromOrder;

    if (!shippyOrder) {
      let id = fulfillment.id;
      let visible_ref = `${fromOrder.display_id}-${id.substr(id.length - 4)}`;
      let ext_ref = `${fromOrder.id}.${fulfillment.id}`;

      if (fromOrder.is_swap) {
        ext_ref = `${fromOrder.id}.${fulfillment.id}`;
        visible_ref = `S-${fromOrder.display_id}`;
      }

      const newOrder = {
        to_address: {
          name: shipping_address.first_name + " " + shipping_address.last_name,
          company: shipping_address.company,
          street1: shipping_address.address_1,
          street2: shipping_address.address_2,
          city: shipping_address.city,
          state: shipping_address.province,
          zip: String(shipping_address.postal_code),
          country: shipping_address.country_code,
          phone: shipping_address.phone,
          email: shipping_address.metadata.email,
        },
        items: fromOrder.items.map((item) => ({
          title: item.variant.product.title,
          imageurl: item.variant.metadata.projection_img_url || item.thumbnail,
          quantity: item.quantity,
          price: (item.unit_price * item.quantity) / 100,
          sku: item.variant.id,
        })),
        parcels: [
          {
            length: 5,
            width: 5,
            height: 5,
            weight: 10,
          },
        ],
        TransactionID: ext_ref,
        Date: Number(
          String(new Date(fromOrder.created_at).getTime()).slice(0, 10)
        ),
        Currency: fromOrder.currency_code.toUpperCase(),
        ItemsCount: fromOrder.items.reduce((total, item) => {
          return total + item.quantity;
        }, 0),
        ContentDescription: "Frames and prints",
        Total: fromOrder.total / 100,
        Status: "Paid",
        APIOrdersID: 2437,
        ShipmentAmountPaid: fromOrder.shipping_total / 100,
        Incoterm: "DAP",
        BillAccountNumber: "",
        PaymentMethod: "Stripe",
        ShippingService: methodData.service_name,
        Note: "",
      };

      return this.client_.orders
        .create(newOrder)
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  }

  //   /**
  //    * Cancels a fulfillment. If the fulfillment has already been canceled this
  //    * is idemptotent. Can only cancel pending orders.
  //    * @param {object} data - the fulfilment data
  //    * @return {Promise<object>} the result of the cancellation
  //    */
  //   async cancelFulfillment(data) {
  //     if (Array.isArray(data)) {
  //       data = data[0];
  //     }

  //     const order = await this.client_.orders
  //       .retrieve(data.id)
  //       .catch(() => undefined);

  //     // if order does not exist, we resolve gracefully
  //     if (!order) {
  //       return Promise.resolve();
  //     }

  //     if (order) {
  //       if (
  //         order.data.attributes.status !== "pending" &&
  //         order.data.attributes.status !== "missing_rate"
  //       ) {
  //         if (order.data.attributes.status === "cancelled") {
  //           return Promise.resolve(order);
  //         }
  //         throw new Error("Cannot cancel order");
  //       }
  //     }

  //     return this.client_.orders.delete(data.id);
  //   }

  async handleWebhook(_, body) {
    try {
      // This is to track when and order is shipped
      console.log("webhook body", body);
      if (body.code === 1) {
        const [orderId, fulfillmentId] = body.TransactionID.split("_ful");

        return this.orderService_.createShipment(
          orderId,
          "ful" + fulfillmentId,
          [{ tracking_number: body.TrackingNumber }]
        );
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  }
}
export default ShippyFulfillmentService;
