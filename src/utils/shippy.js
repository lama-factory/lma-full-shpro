import axios from "axios";

class Shippy {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
    this.client_ = axios.create({
      baseURL: `https://www.shippypro.com/api`,
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
    });

    this.shippingRates = this.buildShippingRateEndpoints_();
    this.orders = this.buildOrderEndpoints_();
  }

  async request(data) {
    return this.client_(data).then(({ data }) => data);
  }

  async call(method, params = {}) {
    const { data } = await this.client_({
      method: "POST",
      url: "/v1",
      data: {
        Method: method,
        Params: params,
      },
    });
    return data;
  }

  buildShippingRateEndpoints_ = () => {
    return {
      retrieve: async (id) => {
        const path = `/v1`;
        const { data } = await this.client_({
          method: "POST",
          url: path,
          data: {
            Method: "GetCarriers",
            Params: {
              Active: 1,
            },
          },
        });
        return data;
      },
      list: async () => {
        return await this.call("GetCarriers", { Active: 1 });
      },
    };
  };

  buildOrderEndpoints_ = () => {
    return {
      retrieve: async (id) => {
        return await this.call("GetOrder", { OrderID: id });
      },
      create: async (data) => {
        return await this.call("PutOrder", data);
      },
      //   delete: async (id) => {
      //     const path = `/v2/orders/${id}`;
      //     return this.client_({
      //       method: "DELETE",
      //       url: path,
      //     }).then(({ data }) => data);
      //   },
    };
  };
}

export default Shippy;
