function alertMessage(type, message) {
    return `
    <div class="alert bm-alert-${type}">${message}</div>
    `;
}

function loader(type, message) {
    return `
    <div class="spinner-border text-${type}" role="status">
        <span class="sr-only"></span>
    </div>
    <h5 class="text-${type}">${message}</h5>
    `
}