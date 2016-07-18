$.ajaxSetup({
    dataType: "json",
    url:      "action.php",
    type:     "post",
    error: function() {
        alert('error', 'Ошибка в запросе');
        return false;
    }
});

$(document).ready(function(){

    var delay = 7*1000;
    setInterval(autoUpdateStatus, delay);

});

function autoUpdateStatus() {
    var id;
    var ip;
    
    $(".pingPcId").each(function(indx, element){
        id = $(element).val();
        ip = $('#ip'+id).html().trim();
        getPing(id, ip);
    });
}

function getPing(id, ip){
    $.ajax({
        data: {
            action: "ping",
            ip: ip
        },
        success: function(data) {
            if (data.error){
                $('#ping'+id).empty().append('Не определен').removeClass("label-success").addClass("label-warning");
            }
            else{
                if(data.transmitted > 0 && data.received > 0 && data.transmitted === data.received){
                    $('#ping'+id).empty().append('Включен').removeClass("label-warning label-important").addClass("label-success");
                }
                else{
                    $('#ping'+id).empty().append('Выключен').removeClass("label-warning label-success ").addClass("label-important");
                }
            }
        }
    });
}

function alert(type, text, delay){
    if(!delay) delay = 3000;
    
    if(!text || !(type === 'block' || type === 'info' ||
        type === 'success' || type === 'error')){
        return false;
    }

    $(".alert").stop();
    $(".alert-"+type+"-text").empty().append(text);
    $(".alert-"+type).delay(150).fadeIn().delay(delay).fadeOut(500);       
    return true;
}

function start(id, mac, ip){
    $.ajax({
        beforeSend: function(){
            $('.btnStart'+id).empty().append('<img src="../img/ajax/ajax-img-1.gif">');
            $('.btn').attr('disabled', 'disabled').addClass('disabled');
        },
        data: {
            action: "start",
            mac: mac,
            network: ip
        },
        success: function(data) {
            if (data.error){
                alert('error', data.msg);
            }
            else{
                alert('success', data.msg);
            }
        },
        complete: function(){
            $('.btnStart'+id).empty().append('Запустить');
            $('.btn').button('complete');
        } 
    });  
}