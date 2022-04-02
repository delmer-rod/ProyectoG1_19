var URL_Materiales = 'http://localhost:90/G1_19/controller/ma_materiales.php?op=GetMateriales';
var URL_PostMaterial = 'http://localhost:90/G1_19/controller/ma_materiales.php?op=InsertMaterial';
var URL_GetMaterial = 'http://localhost:90/G1_19/controller/ma_materiales.php?op=GetMaterial';
var URL_UpdateMaterial = 'http://localhost:90/G1_19/controller/ma_materiales.php?op=UpdateMaterial';
var URL_DeleteMaterial = 'http://localhost:90/G1_19/controller/ma_materiales.php?op=DeleteMaterial';

$(document).ready(function(){

    CargarMateriales();

});

function CargarMateriales(){
    $.ajax({
        url: URL_Materiales,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i<MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD +'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarMaterial('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarMaterial('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Materiales').html(Valores);
            }

        }
    });
}

function AgregarMaterial(){
    var DatosMaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE:$('#PORCENTAJE').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
    };
    var datos_materialJSON = JSON.stringify(DatosMaterial);
    $.ajax({
        url: URL_PostMaterial,
        type: 'POST',
        data: datos_materialJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse)
        },
        error: function(){
            alert('Error al crear material');
        }
    });
    alert('Material agregado');
}


function CargarMaterial(IdMaterial){
    var DatosMateriales = {
        ID: IdMaterial
    }

    var datos_materialJSON = JSON.stringify(DatosMateriales);

    $.ajax({
        url: URL_GetMaterial,
        type: 'POST',
        data: datos_materialJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE').val(MiItems[0].PORCENTAJE);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnActualizar = '<input type="submit" id="btnActualizar" onclick = "ActualizarMaterial('
            + MiItems[0].ID + ')"'+'value="Actualizar Material" class="btn btn-secondary"></input>';
            $('.btnMaterial').html(btnActualizar);
        },
            error: function(){
            alert('Error al cargar material');
            }
    });
   alert('Material cargado');
}

function ActualizarMaterial(IdMaterial){
    
    var DatosMaterial={
        ID: IdMaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE:$('#PORCENTAJE').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
    };
    var datos_materialJSON = JSON.stringify(DatosMaterial);
    $.ajax({
        url: URL_UpdateMaterial,
        type: 'PUT',
        data: datos_materialJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse)
        },
        error: function(){
            alert('Error al actualizar material');
        }
    });
    alert('Material actualizado');

}


function EliminarMaterial(IdMaterial){
    var DatosMaterial={
        ID:IdMaterial
    };

    var datos_materialJSON = JSON.stringify(DatosMaterial);

    $.ajax({
        url: URL_DeleteMaterial,
        type: 'DELETE',
        data: datos_materialJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log = response;
        },
        error:function(){
            alert('Error al eliminar material.')
        }
    });
   alert('Material eliminado');

} 