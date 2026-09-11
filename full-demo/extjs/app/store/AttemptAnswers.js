Ext.define('EvalApp.store.AttemptAnswers', {
    extend: 'EvalApp.store.baseStore',

    alias: 'store.attempt-answers',

    fields: [
        { name: 'question_text', type: 'string' },
        { name: 'reference_answer', type: 'string' },

        {
            name: 'max_score',
            type: 'float'
        },

        { name: 'id', type: 'int' },
        { name: 'attempt_id', type: 'int' },
        { name: 'question_id', type: 'int' },

        { name: 'answer_text', type: 'string' },

        {
            name: 'score',
            type: 'float',
            allowNull: true
        },
        {
            name: 'percentage',
            type: 'float',
            allowNull: true
        },

        { name: 'feedback', type: 'string' },
        { name: 'strengths', type: 'string' },
        { name: 'weaknesses', type: 'string' },

        {
            name: 'confidence',
            type: 'float',
            allowNull: true
        },

        { name: 'grading_status', type: 'string' },
        { name: 'ai_response', type: 'string' },

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
            rootProperty: 'data',
            totalProperty: 'count',
            successProperty: 'success'
        }
    }
});