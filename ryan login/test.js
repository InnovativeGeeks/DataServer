function submitform(){
    $("#loginForm").off().submit();
}

$(document).ready(function(){
    $("#loginForm").submit(function(event){
        event.preventDefault();
    
        //get inputs
        $username = $("#username").val();
        $password = $("#password").val();

        //convert to json
        var data = {
            username: $username,
            password: $password
        }
        var json = JSON.stringify(data);
    
        fetch('../php/login.php', {
            method: 'post',
            body: json,
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(function(res){
            return res.text();
        })
        .then(function(txt){
            if(txt.trim() == 'success'){
                submitform();
            }
            else {
                alert(txt);
            }
        })
        .catch(function(err){
            alert(err);
        });
    });
});