class KeyNameValue {
  convert(obj, key, value) {
    this.key = key || 'Name';
    this.value = value || 'Value';
    return Array.isArray(obj) ? this.fromNameValue(obj) : this.toNameValue(obj);
  }
  fromNameValue(list) {
    const result = {};
    list.forEach(item => {
      result[item[this.key]] = item[this.value];
    });
    return result;
  }
  toNameValue(items) {
    return Object.keys(items).map(key => {
      const obj = {};
      obj[this.key] = key;
      obj[this.value] = items[key];
      return obj;
    });
  }
}

