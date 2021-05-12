/**
 * Created by Ryan Draper
 * 33152216
 */

function validate() {
    var panel = document.getElementById("panelname").value;
    //var s = document.getElementById("source").value;
    //var n = document.getElementById("function");
    var form = document.getElementById("dataform");

    /*
    if (s == 'csv') {
        form.action = "../php/upload.php";
        return true;
    }
    else if (s == 'image') {
        form.action = "../php/upload.php";
        return true;
    }
    else if (s == 'text') {
        form.action = "../php/upload.php";
        return true;
    }
    else {
        form.action = "../php/sinFunction.php";
		return true;
    }*/

    if(panel == '' || panel == null){
        alert("panel name required");
        return false;
    }
    else {
        return true;
    }
}