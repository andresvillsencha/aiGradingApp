/**
 * Shared base store for application stores.
 *
 * Provides common paging, sorting, and auto-load behavior inherited by the
 * application-specific stores.
 */
Ext.define('EvalApp.store.baseStore', {
    extend: 'Ext.data.Store',

    alias: 'store.base-store',

    
    pageSize: 200,
    remoteSort: false,
    autoLoad: true,
});
