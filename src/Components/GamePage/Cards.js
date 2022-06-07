import "../../Pages/GamePage.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



const Cards = ({cards}) => {
    return (
        <Card style={{
            height: 90,
            width: 70,
            margin: 8,
            backgroundColor: 'lightgray',
        }}>
            <CardContent>
                {cards.prop}
            </CardContent>
        </Card>
    )
}

export default Cards;