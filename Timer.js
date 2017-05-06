export default class {
  static sleep = async (millisecond) => {
    return new Promise((resolve) =>{
      setTimeout(()=>{
        resolve();
      }, millisecond);
    });
  }
}
