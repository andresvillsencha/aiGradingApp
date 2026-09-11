/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EvalApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'EvalApp.view.main.MainController',
        'EvalApp.view.main.MainModel',
        'EvalApp.view.main.List',

        'EvalApp.view.school.students.StudentsView',
        'EvalApp.view.school.tests.TestsView',
        'EvalApp.view.school.attempts.TestAttemptsView'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'AI-Eval',
            flex: 0
        },
        iconCls: 'fa-school'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 0,
        layout: {
            type: 'fit',
            align: 'stretch'
        },
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Evaluations',
        iconCls: 'fa-clipboard-check',
        items: [{
            xtype: 'test-attempts-view'
        }]
    }, {
        title: 'Tests',
        iconCls: 'fa-clipboard',
        items: [{
            xtype: 'tests-view'
        }]
    }, {
        title: 'Students',
        iconCls: 'fa-graduation-cap',
        items: [{
            xtype: 'students-view'
        }]
    }]
});
