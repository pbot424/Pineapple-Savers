const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 20;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 20;

const TILE_FLOOR = 0;
const TILE_WALL = 1;

let map = [];
let player = { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2), hp: 10 };

function generateMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        map[y] = [];
        for (let x = 0; x < MAP_WIDTH; x++) {
            const isBorder = x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1;
            if (isBorder) {
                map[y][x] = TILE_WALL;
            } else {
                map[y][x] = Math.random() < 0.2 ? TILE_WALL : TILE_FLOOR;
            }
        }
    }
    // Ensure player starting position is floor
    map[player.y][player.x] = TILE_FLOOR;
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            movePlayer(1, 0);
            break;
    }
});

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (newX < 0 || newX >= MAP_WIDTH || newY < 0 || newY >= MAP_HEIGHT) {
        return;
    }
    if (map[newY][newX] === TILE_FLOOR) {
        player.x = newX;
        player.y = newY;
    }
    draw();
}

function draw() {
    canvas.width = MAP_WIDTH * TILE_SIZE;
    canvas.height = MAP_HEIGHT * TILE_SIZE + 30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            if (map[y][x] === TILE_WALL) {
                ctx.fillStyle = '#555';
            } else {
                ctx.fillStyle = '#999';
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    // Player
    ctx.fillStyle = '#ffd800';
    ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    // UI
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText(`HP: ${player.hp}`, 5, MAP_HEIGHT * TILE_SIZE + 20);
}

// Init
generateMap();
draw();
