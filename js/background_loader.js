var image_list=[
    /*
    ["rocks.jpg","underwater.jpg","mountainskies.jpg","wedding.jpg","underwater.jpg"],
    ["underwater.jpg","rocks.jpg","wedding.jpg","wedding.jpg","underwater.jpg"],
    ["rocks.jpg","underwater.jpg","mountainskies.jpg","underwater.jpg","wedding.jpg"],
    ["underwater.jpg","mountainskies.jpg","rocks.jpg","wedding.jpg","underwater.jpg"],
    ["underwater.jpg","underwater.jpg","mountainskies.jpg","wedding.jpg","rocks.jpg"],
    */
]

for(var i=0;i<5;i++){
    //var line_source=[]
    var column=document.createElement("div");
    column.setAttribute("class", "column");
    
    for(var x=0;x<5;x++){
        //line_source.push('dsfs')
        var line = document.createElement("img");
        console.log(image_list[i][x])
        line.setAttribute("src", `./grid_images/${image_list[i][x]}`);
        column.appendChild(line);

    }
    //grid.push(line)
    var grid=document.getElementsByClassName('img_grid')[0];
    grid.appendChild(column);
    console.log('taligado')
}
console.log(grid)