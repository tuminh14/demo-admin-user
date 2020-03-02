import {dummyAdmin} from "../../../components/admin/admin.dummy";

export default async function dummySomeData() {
  try {
    await dummyAdmin();
    console.log('dummySomeData done');
    return true;
  } catch (error) {
    console.error('dummySomeData error;');
    console.error(error);
    throw error;
  }
}
