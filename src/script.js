async function copyToClipboard(command) {
  console.log(command);
  if (!navigator.clipboard) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Clipboard API not supported!",
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  try {
    const permissionResult = await navigator.permissions.query({ name: "clipboard-write" });
    console.log(permissionResult);

    if (permissionResult.state === "granted" || permissionResult.state === "prompt") {
      await navigator.clipboard.writeText(command);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Command copied to clipboard!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Clipboard permission denied!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    console.error('Error with clipboard:', error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error with clipboard!",
      showConfirmButton: false,
      timer: 1500
    });
  }
}

document.body.addEventListener("click", (e) => {
  if (!e.target.classList.contains("code")) return;

  const firstChild = e.target.firstElementChild;
  if (firstChild) {
    copyToClipboard(firstChild.innerText);
  }
});

(async () => {
  try {
    const url = window.location.href
    
    const response = await fetch(url + '/files');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is JSON

    console.log(data)
    
    let body = document.body;

    for(var i = 0; i < data.length; i++) {
      let game = 
      `
        <div class="game-container">
          <div class="header">
            <p>${data[i].title}</p>
            <p class="size">size: ${data[i].size}</p>
          </div>
          <p class="dl-txt">Download:</p>
          <div class="code">
            <p>
              ${data[i].command}
            </p>
          </div>
        </div>
      `

      body.innerHTML += game
    }
  } catch (error) {
    console.error('Error fetching the files:', error);
  }
})()