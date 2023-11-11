const stringDefault = {
    type: String,
    default: '',
    set: val => {
      if(val === undefined || val === null) {
        return '';
      }
  
      return val;
    }
  };
  
  exports.stringDefault = stringDefault;
  
  exports.setDefault = function setDefault(defaultValue) {
    return function(value) {
      if(value === undefined || value === null){
        return defaultValue;
      }
      return value;
    }
  };
  
  
  exports.convertVenDate = function(dateString) {
      if(dateString === undefined || dateString === null) {
        return null; // '';
      } else if(dateString.length === 0) {
        return null; // '';
      } else {
        console.log('Date:' + dateString.split('@')[0]);
        return new Date(dateString.split('@')[0]);
      }
  };
  