import { Stack } from "@mui/material"
import { categories } from "../../utils/constants";

//const selectedCategory = 'New';
const Sidebar = ({setSelectedCategory, selectedCategory}) => (
    <Stack direction='row' sx={{overflowY: 'auto', height:{sx: 'auto'}, flexDirection: {md: 'column'}}}>
        {categories.map((category) => (
            <button onClick={() => setSelectedCategory(category.name)}
                    className="category-btn" 
                    style={{background: category.name === selectedCategory && '#FC1503', color: 'gray'}} 
                    key={category.name}>
                <span style={{color: category.name === selectedCategory ? 'white' : 'red', marginRight: '15px'}}>{category.icon}</span>
                <span style={{opacity: category.name === selectedCategory ? '1' : '0.8' }}>{category.name}</span>
            </button>
        ))}
    </Stack>
)
export default Sidebar