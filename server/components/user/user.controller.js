import * as UserService from './user.service';

export async function registry(req, res) {
  try {
    let options = req.body;
    let data = await UserService.registry(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function userBuyProduct(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.userBuyProduct(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function login(req, res) {
  try {
    let options = req.body;
    let data = await UserService.login(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}
