/**
 * Created by lockonDaniel on 3/17/16.
 */

(function(){
    'use strict';

    angular.module('appSme').config(sidenavConfig);
    /** @ngInject */
    function sidenavConfig($mdThemingProvider,ssSideNavSectionsProvider)
    {
        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
                'default': '800'
            })
            .accentPalette('amber')
            .warnPalette('deep-orange');


        ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
        ssSideNavSectionsProvider.initWithSections(
            [
                {
                    id: 'main_menu',
                    name: 'Menú Principal',
                    type: 'toggle',
                    pages:
                        [
                            {
                                name: 'Inicio',
                                type: 'link',
                                state: 'dashboard',
                                icon: 'zmdi zmdi-home'
                            },
                            {
                                name: 'Datos Personales',
                                type: 'link',
                                state: 'infoPersonal',
                                icon: 'zmdi zmdi-account-box'
                            },
                            {
                                name: 'Censo',
                                type: 'link',
                                state: 'encuesta',
                                icon: 'zmdi zmdi-comment-text'
                            },
                            {
                                name: 'Reiniciar Censo',
                                type: 'link',
                                state: 'reset',
                                icon: 'fa fa-times'
                            },
                            {
                                name: 'Cerrar Sesión',
                                type: 'link',
                                state: 'logout',
                                icon: 'fa fa-sign-out'
                            }
                        ]
                },
                {
                    id: 'admin_menu',
                    name:'Menú de Administrador',
                    type: 'toggle',
                    hidden:'true',
                    pages:
                        [
                            {
                                name: 'Estadísticas',
                                type: 'link',
                                state: 'base.stats',
                                icon: 'zmdi zmdi-chart'
                            },
                            {
                                name: 'Funciones de Administrador',
                                type: 'link',
                                state: 'base.admin',
                                icon: 'zmdi zmdi-lock'
                            }
                        ]
                }

            ]);

    }


})();