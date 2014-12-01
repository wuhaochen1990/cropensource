// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('color').value;
  var helper = document.getElementById('helper').value;
  chrome.storage.sync.set({
    favoriteColor: color,
	enableHelper: helper
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box
function restore_options() {
  chrome.storage.sync.get({
    favoriteColor: 'yellow', 
	enableHelper: 'yes'	
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
	document.getElementById('helper').value = items.enableHelper;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);