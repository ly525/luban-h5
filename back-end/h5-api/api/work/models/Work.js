'use strict';

/**
 * Lifecycle callbacks for the `Work` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  beforeSave: async (model, attrs, options) => {
    // https://github.com/strapi/strapi/issues/2882
    // need to remove this after this pr will be merged(https://github.com/strapi/strapi/pull/3664)
    Object.keys(model.constructor.attributes).forEach(k => {
      if (model.constructor.attributes[k].type === 'json') {
        const value = model.get(k);

        if (Array.isArray(value)) {
          model.set(k, JSON.stringify(value));
        }
      }
    });
  },

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  beforeCreate: async (model, attrs, options) => {
    const defaultPages = [{
      elements: []
    }];
    model.set('pages', JSON.stringify(defaultPages));
  },

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, attrs, options) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model, attrs, options) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}
};
