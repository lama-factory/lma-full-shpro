class ShippySubscriber {
  constructor({ eventBusService, shippyFulfillmentService }) {
    this.shippyService = shippyFulfillmentService;

    eventBusService.subscribe("shippy.shipment", this.handleShipment);
  }

  handleShipment = async ({ headers, body }) => {
    return this.shippyService.handleWebhook(headers, body);
  };
}

export default ShippySubscriber;
