const difficulties = {
    'Easy': {
        pipeVerticalDistanceRange: [200, 250],
        pipeHorizontalDistanceRange: [500, 550],
        birdGravity: 1100,
        flapVelocity: 400
    },
    'Medium': {
        pipeVerticalDistanceRange: [130, 180],
        pipeHorizontalDistanceRange: [450, 550],
        birdGravity: 1100,
        flapVelocity: 350
    },
    'Hard': {
        pipeVerticalDistanceRange: [95, 115],
        pipeHorizontalDistanceRange: [350, 450],
        birdGravity: 1100,
        flapVelocity: 320
    },
    'Jupiter': {
        pipeVerticalDistanceRange: [200, 250],
        pipeHorizontalDistanceRange: [500, 550],
        birdGravity: 1e7,
        flapVelocity: 400
    },
}

export default difficulties;