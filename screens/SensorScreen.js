import GetAddress from '../components/getAdress';
import axios from axios
const ExampleScreen = () => {
  const ip = GetAddress();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/api/datosensores`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null; // Aquí debes retornar el contenido de tu pantalla, en lugar de null si es necesario.
};

export default ExampleScreen;
