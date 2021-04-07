class Validator {
    isValid(data) {
      if (data.title.trim() === "" || data.mainbody.trim() === "" || data.snippet.trim() === "") {
        return false;
      } else {
        return true;
      }
    }
  }
  
  module.exports = Validator;

  