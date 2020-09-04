var Login = {

    URLBase: Utils.formatUrlEDU(Constantes.BASE_URL + "LoginGeneral/"),
    URLEKADELOGIN: 'https://www3.gobiernodecanarias.org/educacion/9/pekweb/ekadepre/Account/Login_AJAX',
    cargarLogin: function () {
        this.initEnviarLogin();
        // this.enviarInicioLogin();
    },
    enviarLoginDNIIDESP: function () {

        $('#cargaEnvio').show();
        $('#mensajeCompletado').removeClass("hidden").addClass("hidden");
        var data = $('#formLoginDNI').serialize();

        $.ajax({
            type: "POST",
            //url: Login.URLBase + "EnviarLoginDNIIDESP",
            url: Login.URLBase + "EnviarLogin",
            data: data,
            cache:false,
            async: true,
            beforeSend: function () {
                $('#modalVerificacionDatos').modal({ backdrop: 'static', keyboard: false });
            },
            success: function (result) {

                Utils.debug(result);
                
                if (result.Url) {

                    $('#labelMsgValidar').html("Usuario identificado correctamente. Espere un momento mientras completamos la carga de sus datos ...");
                    /*$('#iconModal').removeClass('spinner').html("Redireccionando al formulario...");*/
                    window.location = result.Url;

                } else {
                    $('#btnEnviarLoginDNIIDESP').prop('disabled', false);
                    $('#buttonCancelar').prop('disabled', false);
                    buttonCancelar
                    $('#cargaEnvio').hide();
                    $('#mensajeCompletadoDetail').html(result.Error);
                    $('#mensajeCompletado').removeClass("hidden");
                }
            },
            error: function () {
                $('#btnEnviarLoginDNIIDESP').prop('disabled', false);
                $('#buttonCancelar').prop('disabled', false);
                $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
            }
        });
    },
    enviarLoginGDI: function () {

        $('#cargaEnvio').show();
        $('#mensajeCompletado').removeClass("hidden").addClass("hidden");
        var data = $('#formGDI').serialize();

        $.ajax({
            type: "POST",
            cache: false,
            //url: Login.URLBase + "EnviarLoginGDI",
            url: Login.URLBase + "EnviarLogin",
            data: data,
            async: true,
            beforeSend: function () {
                $('#modalVerificacionDatos').modal({ backdrop: 'static', keyboard: false });
            },
            success: function (result) {
                
                $('#capaTlf').removeClass('hidden').addClass('hidden');
                $('#capaEmail').removeClass('hidden').addClass('hidden');
                if (result.Url) {

                    $('#labelMsgValidar').html("Usuario identificado correctamente. Espere un momento mientras completamos la carga de sus datos ...");
                    /*$('#iconModal').removeClass('spinner').html("Redireccionando al formulario...");*/
                    window.location = result.Url;

                } else {
                    $('#btnEnviarLoginGDI').prop('disabled', false);
                    $('#buttonCancelar').prop('disabled', false);
                    $('#cargaEnvio').hide();
                    $('#mensajeCompletadoDetail').html(result.Error);
                    $('#mensajeCompletado').removeClass("hidden");
                    $('#telefonoMovil').val('');
                    $('#email').val('');
                    $('#capaTlf').removeClass('hidden');
                    $('#capaEmail').removeClass('hidden');

                }
            },
            error: function () {
                $('#btnEnviarLoginGDI').prop('disabled', false);
                $('#buttonCancelar').prop('disabled', false);
                $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
            }
        });
    },
    enviarLoginSUACAS: function () {

        $('#cargaEnvio').show();
        $('#mensajeCompletado').removeClass("hidden").addClass("hidden");
        var data = $('#formSUACAS').serialize();

        $.ajax({
            type: "POST",
            cache: false,
            //url: Login.URLBase + "EnviarLoginGDI",
            url: Login.URLBase + "EnviarLogin",
            data: data,
            async: true,
            beforeSend: function () {
                $('#modalVerificacionDatos').modal({ backdrop: 'static', keyboard: false });
            },
            success: function (result) {

               
                if (result.Url) {

                   // $('#labelMsgValidar').html("Usuario identificado correctamente. Espere un momento mientras completamos la carga de sus datos ...");
                    /*$('#iconModal').removeClass('spinner').html("Redireccionando al formulario...");*/
                    window.location = result.Url;

                } else {
                    $('#btnEnviarLoginSUACAS').prop('disabled', false);
                    $('#buttonCancelar').prop('disabled', false);
                    $('#cargaEnvio').hide();
                    $('#mensajeCompletadoDetail').html(result.Error);
                    $('#mensajeCompletado').removeClass("hidden");
                   

                }
            },
            error: function () {
                $('#btnEnviarLoginSUACAS').prop('disabled', false);
                $('#buttonCancelar').prop('disabled', false);
                $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
            }
        });
    },
    initEnviarLogin: function () {

        $('#btnEnviarLoginDNIIDESP').off().on('click', function (e) {

            e.preventDefault();
            console.log('entra data current');
            $(this).prop('disabled', true);
            $('#buttonCancelar').prop('disabled', true);
            Login.enviarLoginDNIIDESP();
            

           
        });


        //LLAMADA BOTON ENVIAR LOGIN
        $('#btnEnviarLoginSMS').off().on('click', function () {


            $('#cargaEnvio').modal({ backdrop: 'static', keyboard: false }).show();
            $('#mensajeCompletado').removeClass("hidden").addClass("hidden");
            var data = $('#formSMS').serialize();

            $.ajax({
                type: "POST",
                //url: Login.URLBase + "EnviarLoginSMS",
                url: Login.URLBase + "EnviarLogin",
                data: data,
                async: false,
                beforeSend: function () {
                    $('#modalVerificacionDatos').modal({ backdrop: 'static', keyboard: false });
                },
                success: function (result) {

                    if (result.Error) {
                        $('#cargaEnvio').hide();
                        $('#mensajeCompletadoDetail').text(result.Error);
                        $('#mensajeCompletado').removeClass("hidden");
                    } else if (result.Url) {

                        $('#labelMsgValidar').html("Código enviado");
                        window.location = result.Url; //Utils.formatUrlEDU(Constantes.BASE_URL + result.Url); 
                        // $('#iconModal').removeClass('spinner').html("Código enviado");
                    } else {
                        $('#cargaEnvio').hide();
                        $('#mensajeCompletadoDetail').text("");
                        $('#mensajeCompletado').removeClass("hidden");
                    }
                },
                error: function () {
                    $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
                }
            });
        });

        $('#btnValidarCodigoControl').off().on('click', function () {

            if (Validaciones.hayRequeridos("divFormControlDeAcceso")) {
                Avisos.mostrar("Debe de introducir el código de control", "Aviso");
                return;
            }
            $('#cargaEnvio').show();
            $('#mensajeCompletado').removeClass("hidden").addClass("hidden");
            var data = $('#form').serialize();
            Utils.debug('data: ' + data);
            $.ajax({
                type: "POST",
                url: Login.URLBase + "ValidaCodigoControl",
                data: data,
                async: false,
                beforeSend: function () {
                    $('#modalVerificacionDatos').modal({ backdrop: 'static', keyboard: false });
                },
                success: function (result) {

                    if (result.Error) {
                        $('#cargaEnvio').hide();
                        $('#mensajeCompletadoDetail').html(result.Error);
                        $('#mensajeCompletado').removeClass("hidden");
                    } else if (result.Url) {
                        window.location = Utils.formatUrlEDU(Constantes.BASE_URL) + result.Url; //"https://www.gobiernodecanarias.org/educacion/7/general/formssede/" + result.Url;//result.Url;//Utils.formatUrlEDU(Constantes.BASE_URL + result.Url); 
                    } else {
                        $('#cargaEnvio').hide();
                        $('#mensajeCompletadoDetail').text("");
                        $('#mensajeCompletado').removeClass("hidden");
                    }

                },
                error: function () {
                    $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
                }
            });
        });



        $('#btnEnviarLoginGDI').off().on('click', function (e) {

            e.preventDefault();
            console.log('entra data current');
            $(this).prop('disabled', true);
            $('#buttonCancelar').prop('disabled', true);
            Login.enviarLoginGDI();
            
           
        });

        $('#btnEnviarLoginSUACAS').off().on('click', function (e) {

            e.preventDefault();
            console.log('entra data current');
            $(this).prop('disabled', true);
            $('#buttonCancelar').prop('disabled', true);
            Login.enviarLoginSUACAS();


        });

    },

    //enviarInicioLogin: function () {
    //    $('#btnAccederLogin').on('click', function () {
    //        var data = $('formInicioLogin').serialize();
    //        $.ajax({
    //            type: "POST",
    //            url: Login.URLBase + "EnviarInicioLogin",
    //            data: data,
    //            success: function (result) {
    //                if (result.Url) {
    //                    window.location = result.Url;//Utils.formatUrlEDU(Constantes.BASE_URL + result.Url);
    //                } else {
    //                    debug('error inicio login');
    //                }
    //            },
    //            error: function () {
    //            }
    //        });
    //    });
    //},



    //LoginGDIAcceso: function (datosLogin) {
    //    $.ajax({
    //        type: "POST",
    //        url: Login.URLBase + "EnviarLoginGDI",
    //        data: datosLogin,
    //        async: true,

    //        success: function (result) {

    //            if (result.Url) {

    //                window.location = result.Url;
    //            } else {
    //                $('#cargaEnvio').hide();
    //                $('#mensajeCompletadoDetail').html(result.Error);
    //                $('#mensajeCompletado').removeClass("hidden");
    //            }
    //        },
    //        error: function () {
    //            $('#iconModal').removeClass('spinner').html("Se ha producido un error...");
    //        }
    //    });
    //},       

    LoginAnonymousUserApp: function () {
        var token = $('#token').val();

        if (token != null && token.length > 0) {
            $('div.tipoAcceso').fadeOut().removeClass("hidden").addClass("hidden");
            $('.tipoAcceso[tipo-acceso="5"]:first').fadeIn().removeClass("hidden");

            $('.linkAcceso').parent().removeClass("hidden").addClass("hidden");

            //PDTE de validar Con Miguel    
            //$('#TextoMasInformacion').hide();  
            $('.linkAcceso[tipo-acceso="5"]:first').parent().next().removeClass("hidden");
            var lastLinkDiv = $('.linkAcceso[tipo-acceso="5"]:first').parent().prev();
            var lastLink = $('.linkAcceso[tipo-acceso="5"]:first').parent().prev().children();

            if (lastLink != null) {
                var typeLastAccess = lastLink.attr('tipo-acceso');
                var lastNumPage = lastLink.attr('numpage');
                var LastTextButton = lastLinkDiv.text();

                $('#volverTipoAcceso').attr("numPage", lastNumPage);
                $('#volverTipoAcceso').children('span').text(LastTextButton);
                $('#volverTipoAcceso').attr("tipo-acceso", typeLastAccess);
                $('#volverTipoAcceso').removeClass("hidden");
            }
        }
    },

    mostrarOcultarLogin: function (obj) {

        var numPageClick = parseInt(obj.attr("numPage"));

        var tipoAcceso = obj.attr("tipo-acceso");

        if (tipoAcceso == '4') return;

        $('div.tipoAcceso').fadeOut().removeClass("hidden").addClass("hidden");

        $('.tipoAcceso[tipo-acceso="' + tipoAcceso + '"]:first').fadeIn().removeClass("hidden");

        $('.linkAcceso').parent().removeClass("hidden").addClass("hidden");

        var numPageClickNext = numPageClick + 1;
        $('.linkAcceso[numPage="' + numPageClickNext + '"]:first').parent().removeClass("hidden");
        $("#TextoMasInformacion").show();
        if ($('.linkAcceso[numPage="' + numPageClickNext + '"]:first').text() === "") {
            $("#TextoMasInformacion").hide();
        }


        $('#volverTipoAcceso').removeClass("hidden");

        var numPageClickBefore = numPageClick - 1;

        $('#volverTipoAcceso').attr("numPage", numPageClickBefore);

        var tipoAccesoAnte = $('.tipoAcceso[numPage="' + numPageClickBefore + '"]:first').attr('tipo-acceso');

        var textoAccesoAnte = $('.linkAcceso[numPage="' + numPageClickBefore + '"]:first').text();

        $('#volverTipoAcceso').children('span').text(textoAccesoAnte);

        $('#volverTipoAcceso').attr("tipo-acceso", tipoAccesoAnte);
        if (numPageClick == 1)
            $('#volverTipoAcceso').addClass("hidden");
    },
    MostrarLoginPorTipoPresentacion: function () {
        var tipoPresentacion = $('#tipoPresentacion').val();
        if (tipoPresentacion.length === 0 || tipoPresentacion === "0" || tipoPresentacion==="BLANCO") return;
        //var ticket = $('#ticket').val();
        $('.tipoAcceso').removeClass("hidden").addClass("hidden");
        $('#tiposAccesos').removeClass("hidden").addClass("hidden");
        
        $("[tipo-acceso-name=" + tipoPresentacion + "]").removeClass("hidden");


    },
    funcionesGenerales: function () {


        $('a.linkAcceso').off('click').on('click', function () {
            Login.mostrarOcultarLogin($(this));
        });
        $('#volverTipoAcceso').off('click').on('click', function () {
            Login.mostrarOcultarLogin($(this));
        });
        $('#linkRecuperarPassGDI').off('click').on('click', function () {
            $('#MasInfoLoginGDI_modal').modal('toggle');
        });
        $('#linkQueEsNumSoporte').off('click').on('click', function () {
            $('#QueEsNumSoporte_modal').modal('toggle');
        });

        /*function mostrarOcultarVistasTipoAcceso(numPageClick){            
            
            var listaVistasAcceso = $('div.tipoAcceso'); 
            var numPage;   
           
             for (i = 0; i < listaVistasAcceso.length; i++) {    
                 numPage = parseInt($(listaVistasAcceso[i]).attr("numPage"));

                if (numPage == numPageClick)
                {                    
                    $(listaVistasAcceso[i]).fadeIn().removeClass("hidden");       
                }      
                else
                {                    
                    $(listaVistasAcceso[i]).fadeOut().addClass("hidden");                               
                }                  
            }        
        };*/

        //function mostrarOcultarElementoListaLinksAcceso(numPageClick){            
        //    var listaLinksAcceso = $('a.linkAcceso'); 
        //    var numPage;    

        //    for (i = 0; i < listaLinksAcceso.length; i++) {    
        //        numPage = parseInt($(listaLinksAcceso[i]).attr("numPage"));

        //        /*if(numPage <= numPageClick)
        //        {                    
        //            $(listaLinksAcceso[i]).parent().addClass("hidden");                   
        //        }      
        //        else
        //        {                    
        //            $(listaLinksAcceso[i]).parent().removeClass("hidden");                   
        //        } */

        //        if(numPage == (numPageClick + 1)) 
        //            $(listaLinksAcceso[i]).parent().removeClass("hidden");
        //        else 
        //            $(listaLinksAcceso[i]).parent().removeClass("hidden").addClass("hidden");      
        //    }      
        //};

        //$('#volverTipoAcceso').on('click', function (){            
        //var numPageClick = parseInt($(this).attr("numPage")); 
        //mostrarOcultarVistasTipoAcceso(numPageClick); 
        //mostrarOcultarElementoListaLinksAcceso(numPageClick); 
        //actualizarBotonVolverTipoAcceso(numPageClick);  
        //});

        //VALIDAMOS PARA QUE EMAIL O TELEFONO SEAN OBLIGATORIOS
        $('#telefonoMovil, #email').on('change', function () {
            var valorTelefono = $('#telefonoMovil').val();
            var valorEmail = $('#email').val();
            if (valorTelefono !== "" || valorEmail !== "") {
                Validaciones.removeRequerido($('#telefonoMovil'));
                Validaciones.removeRequerido($('#email'));
            } else {
                Validaciones.addRequerido($('#telefonoMovil'));
                Validaciones.addRequerido($('#email'));
            }
        });



        $('.fCaducidadSoporte-checked').on('change', function () {
            var objDeshabilitado = $('[class=fCaducidadSoporte-checked]').parent().parent().find('input[type=text]');
            var objHabilitado = $(this).parent().parent().find('input[type=text]');
            Validaciones.removeRequerido(objDeshabilitado);
            Validaciones.addRequerido(objHabilitado);

            objDeshabilitado.val("").attr('readonly', true);
            objHabilitado.attr('readonly', false);
            objDeshabilitado.blur();
            objHabilitado.blur();

        });

        $('.fechaNacimientoLogin').mask('00/00/0000');


        $('.fechaNacimientoLogin').off('focus').on('focus', function () {



            var id = $(this).attr('id');
            var dp = $(this).datetimepicker({
                format: 'DD/MM/YYYY',
                locale: 'es',
                useCurrent: false
            });
            dp.data("DateTimePicker").show();
        });



        $('#formGDI :input').on('keyup', function (e) {

            if (e.keyCode === 13) {
                $(this).blur();
                $('#btnEnviarLoginGDI').click();
            }
        });

        $('#formSMS :input').on('keyup', function (e) {

            if (e.keyCode === 13) {
                $(this).blur();
                $('#btnEnviarLoginSMS').click();
            }
        });

        $('#formLoginDNI :input').on('keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).blur();
                var noConsiento = $('#checkConsentimiento').is(':checked');
                if (!noConsiento) {
                    $('#btnEnviarLoginDNIIDESP').click();
                }
            }
        });

        $('#checkConsentimiento').off('change').on('change', function () {
            var isChecked = $(this).is(':checked');
            $('#btnEnviarLoginDNIIDESP').prop('disabled', isChecked);
            if (isChecked) {
                $('#ModalNoConsiento').modal('show');
            }

        });

        $('#btnCancelarModalNoConsiento').off('click').on('click', function () {

            $('#checkConsentimiento').prop('checked', false).change();
            $('#ModalNoConsiento').modal('hide');
        });

    }
};

//function cambioAcceso() {
//    var valor = $(this).val();
//    Utils.debug('valor: ' + valor);
//}

$(document).ready(function () {
    //cambioAcceso();
    Utils.debug("Llega cargarLogin");
    Validaciones.init();

    Login.cargarLogin();
    Login.funcionesGenerales();
    Login.MostrarLoginPorTipoPresentacion();

    
      
    
    //Login.LoginAnonymousUserApp();
});