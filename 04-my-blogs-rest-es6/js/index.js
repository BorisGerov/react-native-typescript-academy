import { addNewPost, getAllPosts, deletePosts} from "./blogs-api-client.js";
import { chipsInstances } from "./materialize-helpers.js";

const postsSection = document.getElementById("posts");
const erorrsDiv = document.getElementById("errors");
const addPostForm = document.getElementById("add-post-form");
// const editPostForm = document.getElementById("edit-post-form").value;
// editPostForm.addEventListener("edit", handleEditPost);
addPostForm.addEventListener("submit", handleSubmitPost);
addPostForm.addEventListener("reset", resetForm);



async function init() {
  try {
    const allPosts = await getAllPosts();
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts) {
  posts.forEach((post) => addPost(post));
}

export function showError(err) {
  erorrsDiv.innerHTML = `<div>${err}</div>`;
}

export function addPost(post) {
  const postElem = document.createElement("article");
  postElem.setAttribute("id", post.id);
  postElem.className = "col s12 m6 l4";
  postElem.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${
        post.title
      }<i class="material-icons right">more_vert</i></span>
      <p>Author: ${post.authorId}, Tags: ${
    post.tags ? post.tags.join(", ") : "no tags"
  }</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${
        post.title
      }<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit">Edit
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red lighten-1" onclick="myFunction()" type="button" id="delete">Delete
        <i class="material-icons right">clear</i>
      </button>
    </div>
    </div>
    `;
  postsSection.insertAdjacentElement("beforeend", postElem);
  postElem
    .querySelector("#delete")
    .addEventListener("click", (event) => deletePost(post.id))
    // .addEventListener("clicl", (event) => editPost(post.id))
    ;
}

// async function handleEditPost(editEvent) {
//   try {
//     editEvent.preventDefault();
    
//   } catch(err) {
//     showError(err);
//   }
// }

async function handleSubmitPost(event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {};
    for (const entry of formData.entries()) {
      newPost[entry[0]] = entry[1];
    }
    const tags = chipsInstances[0].chipsData.map((chips) => chips.tag);
    newPost["tags"] = tags;
    const created = await addNewPost(newPost);
    addPost(created);
    resetForm();
  } catch (err) {
    showError(err);
  }
}

export function resetForm() {
  addPostForm.reset();
  const instance = chipsInstances[0];
  while (instance.chipsData.length > 0) {
    instance.deleteChip(0);
  }
}

async function deletePost(id) {
  try {
    deletePosts(id);
    document.getElementById(id).remove();
  } catch (err) {
    showError(err);
  }
}

// async function editPost(pId) {
//   try {
//     editPosts(pId);
//     document.getElementById(pId).contentEditable(true);
//   } catch (err) {
//     showError(err);
//   }
// }
 

init();
