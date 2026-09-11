Ext.define('EvalApp.store.TestAttempts', {
    extend: 'Ext.data.Store',

    alias: 'store.test-attempts',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'student_id',
            type: 'int'
        },
        {
            name: 'test_id',
            type: 'int'
        },

        // Joined from students
        {
            name: 'full_name',
            type: 'string'
        },

        // Joined from tests
        {
            name: 'title',
            type: 'string'
        },

        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'score',
            type: 'float'
        },
        {
            name: 'max_score',
            type: 'float'
        },
        {
            name: 'percentage',
            type: 'float'
        },
        {
            name: 'passed',
            type: 'boolean'
        },
        {
            name: 'started_at',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'submitted_at',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'graded_at',
            type: 'date',
            dateFormat: 'c'
        }
    ],

    proxy: {
        type: 'ajax',

        url: 'http://localhost:3000/api/attempts',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});