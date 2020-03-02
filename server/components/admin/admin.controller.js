import * as Admin_Service from './admin.service';

export async function adminLogin(req, res) {
  try {
    let options = req.body;
    let payload = await Admin_Service.adminLogin(options);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function editUserByAdmin(req, res) {
  try {
    let options = req.body;
    options.id = req.params.id;
    options.admin = req.user;
    let user = await Admin_Service.editUserByAdmin(options);
    return res.RH.success(user);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function editProductByAdmin(req, res) {
  try {
    let options = req.body;
    options.id = req.params.id;
    options.admin = req.user;
    let user = await Admin_Service.editProductByAdmin(options);
    return res.RH.success(user);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminAddUser(req, res) {
  try {
    let options = req.body;
    options.id = req.params.id;
    options.admin = req.user;
    let data = await Admin_Service.adminAddUser(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminAddProduct(req, res) {
  try {
    let options = req.body;
    options.id = req.params.id;
    options.admin = req.user;
    let data = await Admin_Service.adminAddProduct(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminDeleteUser(req, res) {
  try {
    let options = {
      id: req.params.id,
      admin: req.user
    };
    await Admin_Service.adminDeleteUser(options);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminDeleteProduct(req, res) {
  try {
    let options = {
      id: req.params.id,
      admin: req.user
    };
    await Admin_Service.adminDeleteProduct(options);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminGetListUser(req, res) {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let options = {
      admin: req.user,
      limit,
      skip
    };
    if (req.query.text) {
      options.text = req.query.text
    }
    let data = await Admin_Service.adminGetListUser(options);
    return res.RH.paging(data, page, limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function adminGetListProduct(req, res) {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let options = {
      admin: req.user,
      limit,
      skip
    };
    if (req.query.text) {
      options.text = req.query.text
    }
    let data = await Admin_Service.adminGetListProduct(options);
    return res.RH.paging(data, page, limit);
  } catch (error) {
    return res.RH.error(error);
  }
}
