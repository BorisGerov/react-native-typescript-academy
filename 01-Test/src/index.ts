import { Change, FormFieldState, Status, ValidationConfig, ValidationResult , Validators} from './validate.js';
import { AppStateStore } from './state-user.js';
import { BlogsAPI } from './blogs-api-client.js';
import { User } from './users.js';
import { formFieldDict, IdType } from './shared-types.js';

import { addNewUser, getAllUsers } from './functions.js';
import { ID} from './functions.js';







  
  
  // showError(err: any) {
  //   if(!err) {
  //     this.erorrsDiv.innerHTML = ''
  //   } else {
  //     this.erorrsDiv.innerHTML = `<div>${err}</div>`;
  //   }
  // }

  // addPostDOM(post: User) {
  //   const postElem = document.createElement('article');
  //   postElem.setAttribute('id', post.id!.toString());
  //   postElem.className = "col s12 m6 l4";
  //   this.re(postElem, post);
  //   this.postsSection.insertAdjacentElement("beforeend", postElem);
  // }

  
  // editPost(post: User) {
  //   this.fillPostForm(post);
  //   window.scrollTo(0, 0);
  //   AppStateStore.editedPost = post;
  // }

  // fillPostForm(post: User) {
  //   let field: keyof User;
  //   for (field in post) {
  //     (document.getElementById(field) as HTMLFormElement).value = post[field];
  //     const label = document.querySelector(`#add-post-form label[for=${field}]`);
  //     if (label) {
  //       label.className = 'active';
  //     }
  //   }
  // }


//   handleSubmitPost = async (event: SubmitEvent) => {
//     try {
//       event.preventDefault();
//       const post = this.getPostFormSnapshot();
//       // const post = newPost as unknown as Post;
//       if (post.id) {
//         const updated = await BlogsAPI.updatePost(post);
//         this.updatePostDOM(updated);
//         AppStateStore.editedPost = undefined;
//       } else {
//         const created = await BlogsAPI.addNewPost(post);
//         this.addPostDOM(created);
//       }
//       this.resetForm();
//     } catch (err) {
//       this.showError(err);
//     }
//   }

  // getPostFormSnapshot(): import User {
  //   const formData = new FormData(this.addPostForm);
  //   const np: formFieldDict<string> = {};
  //   formData.forEach((value, key) => {
  //     np[key] = value.toString();
  //   })
  //   return new User(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.id));
  // }


//   async deletePost(postId: IdType) {
//     try {
//       await BlogsAPI.deletePostById(postId);
//       document.getElementById(postId!.toString())?.remove();
//     } catch (err) {
//       this.showError(err);
//     }
//   }
// getSnapshot(): User {
  
// }
const validateForm = (event: Event) => {
  const validationResult: ValidationResult<User> = {};
  const config = AppStateStore.postFormValidationConfig;
  const snapshot = this!.getSnapshot;
  let field: keyof ValidationConfig<User>;
  for(field in config) {
    const validator = config[field];
    if(validator !== undefined) {
      try {
        if(Array.isArray(validator)) {
          for(const correct of validator) {
            try {
              correct(snapshot[field]!.toString(), field);
            } catch(err) {
              if(validationResult[field] === undefined) {
                validationResult[field] = [] as Array<string>;
              }
              validationResult[field]!.push(err as string);
            }
          }
        }
        else {
          validator(snapshot[field]!.toString(), field);
        }
      } catch(err) {
        validationResult[field] = [err as string];
      }
    }
  }
  this!.showValidationErrors(validationResult);
}
  // 
//   showValidationErrors(validationResult: ValidationResult<User>) {
//     AppStateStore.postFormErrors = [];
//     let field: keyof ValidationResult<User>;
//     for (field in validationResult) {
//       const filedErrors = validationResult[field];
//       if (filedErrors !== undefined) {
//         for (const err of filedErrors) {
//           AppStateStore.postFormErrors.push(`${field} -> ${err}<br>`);
//         }
//       }
//     }
//     this.showError(AppStateStore.postFormErrors.join(""));
//   }
// }



function registerPage() {
  const index = document.getElementById("index-banner") as HTMLElement;
  index.innerHTML =`<div class="container">
  <h1 class="header center orange-text">Register</h1>

  
  <div class="row">
      <form id="add-post-form" class="col s12">
          <div class="row">
              <input id="id" name="id" hidden>
          </div>
          <div class="row">
              <div class="input-field col s6">
                  <input id="fName" name="fName" type="text" class="validate" required>
                  <label for="fName">First Name</label>
              </div>
              <div class="input-field col s6">
                  <input id="lName" name="lName" type="text" class="validate" required>
                  <label for="lName">Last Name</label>
              </div>
              <div class="input-field col s6">
                  <input id="username" name="username" type="text" class="validate" required>
                  <label for="username">Username</label>
              </div>
              
              <div class="input-field col s6">
                  <input id="password" name="password" type="password" class="validate" required>
                  <label for="password">Password</label>
              </div>        
              <div class="input-field col s6">
                  <input id="gender" name="gender" type="text" class="validate" required>
                  <label for="gender">What's your gender ... ?</label>
              </div>
             
              <div class="input-field col s12">
                  <input id="imageUrl" name="imageUrl" type="url" class="validate" optional>
                  <label for="imageUrl">User Image URL</label>
              </div>
              <div class="input-field col s12">
                  <textarea id="content" name="content" class="materialize-textarea" optional></textarea>
                  <label for="content">Short Description</label>
              </div>
          </div>
          
          <button class="btn waves-effect waves-light" type="submit" name="submit">Register
              <i class="material-icons right">send</i>
          </button>
          
      </form>
  </div>
</div>`;
}

function loginPage() {
  const index = document.getElementById("index-banner") as HTMLElement;
  index.innerHTML =`<div class="container">
  <h1 class="header center orange-text">Login</h1>

  
  <div class="row">
      <form id="add-post-form" class="col s12">
          <div class="row">
              <input id="id" name="id" hidden>
          </div>
          <div class="row">
              <div class="input-field col s6">
                  <input id="username" name="username" type="text" class="validate" required>
                  <label for="username">Username</label>
              </div>
              <div class="input-field col s6">
                  <input id="password" name="password" type="password" class="validate" required>
                  <label for="password">Password</label>
              </div>
          </div>
          
          <button class="btn waves-effect waves-light" type="submit" name="submit">Log in
              <i class="material-icons right">send</i>
          </button>
          
      </form>
  </div>
</div>`;
}


async function init() {
  registerPage();
  const regID = document.getElementById("register") as HTMLElement;
  regID.addEventListener('click', () => {
    registerPage();
    console.log(ID())
  })
  loginPage();
  const logID = document.getElementById("login") as HTMLElement;
  logID.addEventListener('click', () => {
    loginPage();
    console.log(ID())
  })
//   try {
//     const allPosts = await getAllUsers();
//     showUsers(allPosts);
//   } catch (err) {
//     showError(err);
// }
}

export function showUsers(users: any[]) {
  users.forEach(users => addUser(users));
}
const erorrsDiv = document.getElementById("errors");

export function showError(err: any) {
  erorrsDiv!.innerHTML = `<div>${err}</div>`;
}


init();

function showValidationErrors(validationResult: any, arg1: any) {
  throw new Error('Function not implemented.');
}
function validationResult(validationResult: any, arg1: any) {
  throw new Error('Function not implemented.');
}

function getPostFormSnapshot() {
  throw new Error('Function not implemented.');
}

function getSnapshot() {
  throw new Error('Function not implemented.');
}

  function addPost(users: any): void {
    throw new Error('Function not implemented.');
  }

  function addUser(users: any): void {
    throw new Error('Function not implemented.');
  }

