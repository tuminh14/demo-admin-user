export default class ResponseHandler {
  constructor (res) {
    this.res = res
  }

  success (data) {
    if (data) {
      return this.res.json({
        success: true,
        data
      })
    } else {
      return this.res.json({
        success: true
      })
    }
  }

  errorparam (data) {
    return this.res.json({
      status: data.status,
      success: false,
      error: data.error
    })
  }

  error (error) {
    if(process.env.NODE_ENV === 'development') {
      console.log('error : ', error);
    }
    return this.res.status(error.statusCode || 500).json(error);
  }

  /**
   * Array Data
   * Data[0]: total item
   * Data[1]: Data follow page
   * */
  paging ([count = 0, data = []], page = 1, limit = 10) {
    return this.res.status(200).json({
      success: true,
      total_page: Math.ceil(count / limit),
      total_item: count,
      page: page,
      item: data.length,
      data: data
    })
  }
}
