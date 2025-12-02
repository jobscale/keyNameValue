export class KeyValuePairList {
  convert(obj, key = 'Name', value = 'Value') {
    return Array.isArray(obj)
      ? this.unmap(obj, key, value)
      : this.map(obj, key, value);
  }

  unmap(list, key = 'Name', value = 'Value') {
    const result = {};
    list.forEach(item => { result[item[key]] = item[value]; });
    return result;
  }

  map(items, key = 'Name', value = 'Value') {
    return Object.entries(items).map(([k, v]) => ({ [key]: k, [value]: v }));
  }
}

export const keyValuePairList = new KeyValuePairList();
