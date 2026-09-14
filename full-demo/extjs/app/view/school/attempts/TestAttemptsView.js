/**
 * Main grid for browsing test attempts.
 *
 * Supports grouping by test, local grid filters, formatted grading results, and
 * opening the full details window for a selected attempt.
 */
Ext.define('EvalApp.view.school.attempts.TestAttemptsView', {
    extend: 'Ext.grid.Panel',

    xtype: 'test-attempts-view',

    requires: [
        'EvalApp.store.TestAttempts',
        'EvalApp.view.school.attempts.TestAttemptsController'
    ],

    controller: 'test-attempts',

    store: {
        type: 'test-attempts'
    },

    plugins: {
        gridfilters: true
    },

    features: [{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
    }],


    title: 'Test Attempts',
    id: 'tests-grid',

    columns: [{
        text: 'ID',
        dataIndex: 'id',
        width: 70,
        filter: {
            type: 'number'
        }
    }, {
        text: 'Student',
        dataIndex: 'full_name',
        flex: 1,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Test',
        dataIndex: 'title',
        flex: 2,

        filter: {
            type: 'list'
        }
    }, {
        text: 'Status',
        dataIndex: 'status',
        width: 110,
        align: 'center',

        filter: {
            type: 'list',
            options: [
                'started',
                'submitted',
                'graded'
            ]
        },

        /**
         * Converts the attempt status into styled HTML for the grid.
         *
         * @param {String} value Attempt status.
         * @returns {String} Styled status text.
         */
        renderer: function (value) {
            if (value === 'submitted') {
                return '<b style="color:#369;">Submitted</b>';
            }

            if (value === 'graded') {
                return '<b style="color:#396;">Graded</b>';
            }

            if (value === 'started') {
                return '<b style="color:#996600;">Started</b>';
            }

            return Ext.String.capitalize(value);
        }
    }, {
        text: 'Score',
        dataIndex: 'score',
        width: 90,
        align: 'center',

        filter: {
            type: 'number'
        },

        /**
         * Formats the awarded score against the attempt's maximum score.
         *
         * @param {Number|null} value Score value.
         * @param {Object} a Grid renderer metadata argument.
         * @param {Ext.data.Model} row Attempt record being rendered.
         * @returns {String} Styled score HTML.
         */
         renderer: function (value, a, row) {
            let maxScore = row.get('max_score') || 0;
            let newValue = (value === null || value === undefined) ? "-" : value;
            let color = (row.get('passed')=='1') ? "#396" : "#933";

            if (newValue!='-') {
                return `<span style="background-color:${color}; border-radius: 8px; color:#fff; padding: 4px 8px;">${newValue}/${maxScore}</span>`;
            } else {
                return `<span style="background-color:#666; border-radius: 8px; color:#fff; padding: 4px 8px;">NA</span>`;
            }
            
        }
    }, {
        text: 'Grade Percentage',
        dataIndex: 'percentage',
        width: 90,
        align: 'center',
        formatter: 'number("0.0%")',
        filter: {
            type: 'number'
        },
    }, {
        text: 'Result',
        dataIndex: 'passed',
        width: 90,
        align: 'center',

        filter: {
            type: 'boolean'
        },

        /**
         * Displays the final pass/fail result only after an attempt is graded.
         *
         * @param {Boolean} value Passed flag.
         * @param {Object} meta Grid cell metadata.
         * @param {Ext.data.Model} record Attempt record being rendered.
         * @returns {String} Styled result text or an em dash before grading.
         */
        renderer: function (value, meta, record) {
            if (record.get('status')==='graded') {
                if (value === true) {
                    return '<b style="color:#396;">Passed</b>';
                }

                return '<b style="color:#933;">Failed</b>';
            }
            return '&mdash;';
        }
    }, {
        text: 'Submitted',
        dataIndex: 'submitted_at',
        width: 160,

        renderer: Ext.util.Format.dateRenderer(
            'm/d/Y H:i'
        )
    }, {
        xtype: 'actioncolumn',

        text: 'Actions',

        width: 80,
        align: 'center',

        items: [{
            iconCls: 'x-fa fa-eye',
            tooltip: 'View Attempt',

            handler: 'onViewAttempt'
        }]
    }],

    bbar: {
        xtype: 'pagingtoolbar',

        displayInfo: true,

        displayMsg: 'Displaying attempts {0} - {1} of {2}',
        emptyMsg: 'No attempts to display'
    }
});