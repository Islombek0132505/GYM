import {motion} from 'motion/react'

const Detect = () => {

    return (
        <div className="w-full fixed h-screen flex items-center justify-center [z-index:_1000]">
            <motion.div 
                initial = {{scale: 0}}
                animate = {{scale: 1}}
                transition={{duration: 0.5}}
                className="h-screen w-full z-50 bg-red-700 flex items-center justify-center"
            >
                <h1 className="text-white font-bold">Site kodini ochish taqiqlanadi siz 5 minutga bloklandiz</h1>
            </motion.div>
        </div>
    )
}

export default Detect