import { expect } from "chai";

describe('Files module', () => {

  

  it('debería demostrar aserciones expect', () => {
    const name = 'John';
    const age = 30;
    const hobbies = ['reading', 'coding'];
    const user = { name: 'John', active: true };

    // Igualdad
    expect(name).to.equal('John');
    expect(age).to.be.a('number');

    // Igualdad profunda para objetos/arrays
    expect(user).to.deep.equal({ name: 'John', active: true });

    // Longitud e inclusión
    expect(hobbies).to.have.lengthOf(2);
    expect(hobbies).to.include('coding');

    // Existencia de propiedad
    expect(user).to.have.property('name');
    expect(user).to.have.property('name', 'John');

    // Verificaciones booleanas
    expect(user.active).to.be.true;
    expect(undefined).to.be.undefined;
    expect(null).to.be.null;

    // Negación
    expect(name).to.not.equal('Jane');
  });
});