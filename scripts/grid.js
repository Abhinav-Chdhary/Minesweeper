export function makeGrid(n, grid){
    const gridContainer = document.getElementById('gridContainer');
    let content = "";
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            content += `<button>${grid[i][j]}</button>`;
        }
        content += "<br>";
    }
    gridContainer.innerHTML = content;
}