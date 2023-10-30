
const cy = cytoscape({
    container: $('#div-graphview')
  });

const addNode = (groupName,data,position) =>{

    return cy.add([{group:groupName,data,position}]);

}



