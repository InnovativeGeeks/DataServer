var user = document.querySelector('#userid');

user.addEventListener('keyup',function()
{
	var u_times = document.querySelector('.u_times');
	var u_check = document.querySelector('.u_check');

	if( (user.value.length == 0) || (user.value.length < 6) ) 
	{
		user.style.border = '1px solid red';
		u_times.style.display = 'block';
		u_check.style.display = 'none';
		return false;
	}
	else
	{
		user.style.border = '1px solid green';
		u_times.style.display = 'none';
		u_check.style.display = 'block';

	}
})

var pass = document.querySelector('#userpassword');

pass.addEventListener('keyup',function()
{
	var p_times = document.querySelector('.p_times');
	var p_check = document.querySelector('.p_check');

	if( (pass.value.length == 0) || (pass.value.length < 8) ) 
	{
		pass.style.border = '1px solid red';
		p_times.style.display = 'block';
		p_check.style.display = 'none';
		return false;
	}
	else
	{
		user.style.border = '1px solid green';
		p_times.style.display = 'none';
		p_check.style.display = 'block';

	}
})

function validate() 
{
	
	if ((userid.value == 0 )|| (userid.value.length < 6) )
	{
		document.getElementById('error').innerHTML = 'Please fill the required fields!';
		return false;
	}else if (userpassword.value == 0 || userpassword.value.length < 8) 
	{
		document.getElementById('error').innerHTML = 'Please fill the required fields!';
		return false;
	}

	if((userid.value == 'shri2224') && (userpassword.value  == 'shri4422'))
	{
		alert('login sccessful');
	}
	else if((userid.value  == 'james1234') && (userpassword.value  == 'james4321'))
	{
		alert('login sccessful');
	}
	else
	{
		alert('invalid user');
	}
}
