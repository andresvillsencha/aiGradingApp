Ext.define('EvalApp.store.Students', {
    extend: 'EvalApp.store.baseStore',

    alias: 'store.students',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:3000/api/students',
        reader: {
            rootProperty: 'data',
            totalProperty: 'count',
            successProperty: 'success'
        }
    }
});
