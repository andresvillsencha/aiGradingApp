Ext.define('EvalApp.store.StudentAnswers', {
    extend: 'Ext.data.Store',

    alias: 'store.student-answers',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'attempt_id',
            type: 'int'
        },
        {
            name: 'question_id',
            type: 'int'
        },

        // Joined from questions
        {
            name: 'question_text',
            type: 'string'
        },
        {
            name: 'reference_answer',
            type: 'string'
        },
        {
            name: 'max_score',
            type: 'float'
        },

        // Student answer
        {
            name: 'answer_text',
            type: 'string'
        },

        // AI grading results
        {
            name: 'score',
            type: 'float'
        },
        {
            name: 'percentage',
            type: 'float'
        },
        {
            name: 'feedback',
            type: 'string'
        },
        {
            name: 'strengths',
            type: 'string'
        },
        {
            name: 'weaknesses',
            type: 'string'
        },
        {
            name: 'confidence',
            type: 'float'
        },
        {
            name: 'grading_status',
            type: 'string'
        },
        {
            name: 'graded_at',
            type: 'date',
            dateFormat: 'c'
        }
    ],

    proxy: {
        type: 'ajax',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});