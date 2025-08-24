let authForm,
  authFormEmail,
  authFormPassword,
  authFormSubmit,
  emailError,
  passwordError,
  togglePasswordVisibility,
  alertError,
  alertClose,
  registrationLinkInAlert,
  registrationLinkInForm;
const wrapper = document.querySelector("#wrapper")

const users = [
    {email: 'user1@mail.ru', password:'Domr4532'},
    {email: 'user1@mail.ru', password:'Domr4532'},
    {email: 'user2@mail.ru', password:'Domr3332'},
    {email: 'user3@mail.ru', password:'Domr32312'},
]

const validationRules = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
}

const formValidation = {
    email: false,
    password: false,
}

const formTypes = ['auth', 'reg'];

let isAlertErrorVisible = false;

const passwordIcons = {
    eyeOpen: "url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)",
    eyeClose: "url(https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999)",
}

const authFormMarkUp = `
    <form id="auth-form" class="border border-sky-50/50 flex flex-col w-full max-w-md rounded-xl p-10 pt-5 gap-2">
            <h1 class="text-white text-3xl mb-3">Авторизация</h1>
            <div>
                <p id="email-error" class="text-red-600 text-xs mb-1 invisible">Не верно введена почта</p>
                <input id="auth-form-email" type="text" name="email" placeholder="Введите почту" class="border border-gray-50/50 rounded-xl text-white px-3 py-2 w-full" autofocus>
            </div>
            <div class="relative mb-6" >
                <p id="password-error" class="text-red-600 text-xs mb-1 invisible">Не верный пароль</p>
                <input id="auth-form-password" disabled type="password" name="password" placeholder="Введите пароль" class="border border-gray-50/50 rounded-xl text-white px-3 py-2 disabled:opacity-50 w-full">
                <button id="toggle-password-visibility" class="hidden absolute right-3 bottom-1/10 -translate-y-1/6 w-5 h-5 appearance-none cursor-pointer
                bg-no-repeat" style="background-image:url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)" data-visibility="false">
                </button>
            </div>
            <input id="auth-form-submit" type="submit" value="Войти" class=" rounded-md bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 cursor-pointer disabled:opacity-50 disabled:bg-blue-500" disabled>
            <a id="registration-link-in-form" class="font-normal text-blue-600 underline self-center hover:no-underline hover:text-amber-50" href="">Регистрация</a>
        </form>
`;
const regFormMarkUp = `
<form id="auth-form" class="border border-sky-50/50 flex flex-col w-full max-w-md rounded-xl p-10 pt-5 gap-2">
            <h1 class="text-white text-3xl mb-3">Регистрация</h1>
            <div>
                <p id="email-error" class="text-red-600 text-xs mb-1 invisible">Не верно введена почта</p>
                <input id="auth-form-email" type="text" name="email" placeholder="Введите почту" class="border border-gray-50/50 rounded-xl text-white px-3 py-2 w-full" autofocus>
            </div>
            <div class="relative mb-6" >
                <p id="password-error" class="text-red-600 text-xs mb-1 invisible">Не верный пароль</p>
                <input id="auth-form-password" disabled type="password" name="password" placeholder="Введите пароль" class="border border-gray-50/50 rounded-xl text-white px-3 py-2 disabled:opacity-50 w-full">
                <button id="toggle-password-visibility" class="hidden absolute right-3 bottom-1/10 -translate-y-1/6 w-5 h-5 appearance-none cursor-pointer
                bg-no-repeat" style="background-image: url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)" data-visibility="false">
                </button>
            </div>
            <input id="auth-form-submit" type="submit" value="Зарегестрироваться" class=" rounded-md bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 cursor-pointer disabled:opacity-50 disabled:bg-blue-500" disabled>
            <a


id="registration-link-in-form" class="font-normal text-blue-600 underline self-center hover:no-underline hover:text-amber-50" href="">Войти</a>
        </form>
`;

const checkSubmitDisabled = () =>{
    if(formValidation.email && formValidation.password){
        authFormSubmit.disabled = false;
    }else{
        authFormSubmit.disabled = true;
    }
}

const render = (markup) =>{
    wrapper.insertAdjacentHTML('afterbegin', markup)
}

const init = (formType) =>{
    authForm = document.querySelector("#auth-form");
    authFormEmail = document.querySelector("#auth-form-email");
    authFormPassword = document.querySelector("#auth-form-password");
    authFormSubmit = document.querySelector("#auth-form-submit");
    emailError = document.querySelector("#email-error");
    passwordError = document.querySelector("#password-error");
    togglePasswordVisibility = document.querySelector("#toggle-password-visibility");
    alertError = document.querySelector("#alert-error");
    alertClose = document.querySelector("#alert-close");
    registrationLinkInForm = document.querySelector("#registration-link-in-form");
    registrationLinkInAlert = document.querySelector("#registration-link-in-alert");

    authForm.addEventListener('submit', (e)=>{
      e.preventDefault();    
      const formObj = new FormData(e.target);
      const formData = Object.fromEntries(formObj);
      if (formData.email.match(validationRules.emailRegex) &&formData.password.match(validationRules.passwordRegex)) {
        if(formType === formTypes[0]){
          const isUser = users.find(
          (user) =>
          formData.email === user.email && formData.password === user.password);
          if (!isUser) {
            alertError.classList.remove("opacity-0");
            isAlertErrorVisible = true;
            if (isAlertErrorVisible) {
              setTimeout(() => {
                alertError.classList.add("opacity-0");
              }, 7000);
            }
          } else {
            location.href = "posts.html"
          }
        }else if(formType === formTypes[1]){
          users.push(formData);
          authForm.remove();
          render(authFormMarkUp);
          init(formTypes[0])
        }


      //  { email: "user1@mail.ru", password: "qwe123QWE" },
    }
  });
    authFormEmail.addEventListener('input', (e)=>{
      if (e.target.value.match(validationRules.emailRegex)){
          formValidation.email=true;
          authFormPassword.disabled=false;
          emailError.classList.add("invisible");
      }else{
          formValidation.email=false;
          emailError.classList.remove("invisible");
          authFormPassword.disabled=true;
      } 
      checkSubmitDisabled(); 
    })
    authFormPassword.addEventListener('input', (e)=>{
      if(e.target.value){
          togglePasswordVisibility.classList.remove("hidden");
      }else{
          togglePasswordVisibility.classList.add("hidden");
      }
      
      if(e.target.value.match(validationRules.passwordRegex)){
          formValidation.password=true;
          passwordError.classList.add("invisible");
      }else{
        formValidation.password = false;
        passwordError.classList.remove("invisible");
      }
      checkSubmitDisabled();
    });

    togglePasswordVisibility.addEventListener('click', (e)=>{
      if(e.target.dataset.visibility === "true"){
          authFormPassword.type = "password";
          e.target.style.backgroundImage = passwordIcons.eyeOpen
          e.target.dataset.visibility = "false";
      } else{
          authFormPassword.type = "text";
          e.target.style.backgroundImage = passwordIcons.eyeClose;
          e.target.dataset.visibility = "true";
      }
      authFormPassword.focus();
    })

    alertClose.addEventListener('click', ()=>{
      if(isAlertErrorVisible){
          alertError.classList.add("opacity-0");
      }
    })
 
    registrationLinkInAlert.addEventListener("click", (e) => {
      e.preventDefault();
      authForm.remove();
      render(regFormMarkUp);
      init(formTypes[1]);
    });
    registrationLinkInForm.addEventListener("click", (e) => {
      e.preventDefault();
      authForm.remove();
      render(regFormMarkUp);
      init(formTypes[1]);
    });
}

//  document.addEventListener('DOMContentLoaded', render.bind({}, authFormMarkUp))
document.addEventListener('DOMContentLoaded', () =>{
    render(authFormMarkUp);
    init(formTypes[0]);
});