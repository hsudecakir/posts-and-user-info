const postsList = document.querySelector('.postsList');
let userData; 
let commentsData;

function render(posts){
  postsList.innerHTML = '';
  for (const post of posts) {
    postsList.innerHTML += `
    <li class="post">
      <div class="user-infos" data-id="${post.id}">
      </div>
      <div class="post-content">
        <h2>${post.title}</h2>
        <p class="content">'${post.body}'</p>
        <div class="reactions">
            <p class="likes"><i class="fa-solid fa-thumbs-up"></i> ${post.reactions.likes}</p>
            <p class="dislikes"><i class="fa-solid fa-thumbs-down"></i> ${post.reactions.dislikes}</p>
        </div>
      </div>
      <div class="comments">
        <p class="comments"><i class="fa-regular fa-comment"></i> Comments</p>
        <div class="post-comments" data-id="${post.id}">
        </div>
      </div>
    </li>`
  }
  bindUserInfoContainers(usersData.users);
  bindCommentContainers(commentsData.comments);
}

function bindUserInfoContainers(users){
  const userInfoContainers = Array.from(document.querySelectorAll('.user-infos'));
  for (const user of users) {
    const matchedUsers = userInfoContainers.findIndex(userInfoContainer => Number(userInfoContainer.dataset.id) == user.id);
    userInfoContainers[matchedUsers].innerHTML = `
      <img src="assets/images/pp.png" alt="Profile Picture">
      <div class="user-infos__wrapper">
        <p class="name">${user.firstName}<span class="lastname">${user.lastName}</span></p>
        <p class="username">@${user.username}</p>
        <p class="email">${user.email}</p>
      </div>
    `;
  }
}

function bindCommentContainers(comments){
  const commentContainers = Array.from(document.querySelectorAll('.post-comments'));
  for (const comment of comments) {
    const matchedComments = commentContainers.findIndex(commentContainer => Number(commentContainer.dataset.id) == comment.id);
    commentContainers[matchedComments].innerHTML = `
      <div class="post-comments__wrapper">
        <img src="assets/images/pp.png" alt="Profile Picture">
        <p class="comment-name">${comment.user.fullName}</p>
      </div>
      <p class="comment-body">'${comment.body}'</p>
    `;
  }
}

async function init() {
  const data = await fetch('https://dummyjson.com/post').then(res => res.json())
  usersData = await fetch('https://dummyjson.com/users').then(res => res.json())
  commentsData = await fetch('https://dummyjson.com/comments').then(res => res.json())
  render(data.posts);
}
init();