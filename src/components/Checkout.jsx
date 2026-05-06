import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Checkout.css';

function Checkout() {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        Name: '',
        Apellidos: '',
        DNI: '',
        Tarjeta: ''  // evita usar "Nº de tarjeta" como nombre
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = () => {

        const { Name, Apellidos, DNI, Tarjeta } = formData;

        if (!Name.trim()) {

            alert("CACAC");
            let p = document.getElementById("Name");

            p.setState({
                inputClass: "invalid"
            })

            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!Apellidos.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!DNI.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!Tarjeta.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        alert('Todos los campos están correctamente llenos. Proceder con la compra.');
        navigate('/');
    };

    const location = useLocation();
    const librosRecibidos = location.state?.items || [];

    const total = librosRecibidos.reduce((acumulador, libro) => acumulador + ((libro.price * libro.unidades) || 0), 0);

    return (
        <div className="checkout-container">
            <div className="checkout-details">
                <tr>
                    <td>
                        <label for="Nombre">Nombre</label>
                    </td>
                    <td>
                        <label for="Apellidos">Apellidos</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleChange}/>
                    </td>
                    <td>
                        <input type="text" id="Apellidos" name="Apellidos" value={formData.Apellidos} onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="DNI">DNI</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="DNI" name="DNI" value={formData.DNI} onChange={handleChange} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="Nº de tarjeta">Nº de tarjeta</label>
                    </td>
                </tr>
                <tr>                    
                    <td colspan="2" align='center'> 
                        <input type="text" id="tarjeta" name="Tarjeta" value={formData.Tarjeta} onChange={handleChange}/>
                    </td>                     
                </tr>
                <tr>
                    <td colspan="2" >
                        <button className="checkout-button" onClick={handleCheckout}>Finalizar compra</button>
                    </td>
                </tr>
            </div>

            <div className="checkout-summary">
      
                {librosRecibidos.map((libro) => (
                    <div className="checkout-book" key={libro.id}>
                        <div className="checkout-bookimage">
                            <img src={libro.image} width="50" height="75" alt="bookImage" />
                        </div>
                        <div className="checkout-bookinfo">
                            <p> Libro: {libro.title}</p>
                            <p> Unidades: {libro.unidades}</p>
                            <p> Precio: {libro.price} €</p>                            
                        </div>
                        <div className="checkout-separator">   
                        </div>
                    </div>  
                ))} 
                
                <div className="checkout-total">
                    <h3>Total: {total.toFixed(2)} €</h3>
                </div>
            </div>
        </div>
    );
}

export default Checkout;