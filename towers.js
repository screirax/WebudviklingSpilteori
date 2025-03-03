class Tower {
    constructor(x, y, range, damage, towerAttackSpeed, goldPrice) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.damage = damage;
        this.towerAttackSpeed = towerAttackSpeed
        this.LastTowerAttack = 0;
        this.cost = goldPrice

    }

    attack(enemy) {
        let towertime = Date.now();

        if(towertime - this.LastTowerAttack >= 1000 / this.towerAttackSpeed) {

            const distance = Math.sqrt(Math.pow(enemy.pos.x - this.x, 2) + Math.pow(enemy.pos.y - this.y, 2));

            if (distance <= this.range) {
                enemy.health -= this.damage;
                this.LastTowerAttack = towertime;
            }

        }

    }

}

function placeTower(x, y) {
    let towerPrice = 15;

    if (gold >= towerPrice){
        gold -= towerPrice;
        let newTower = new Tower(x, y, 100, 5, 4);
        towers.push(newTower);
    }
    else {}
}

function renderTowers(context) {
    context.fillStyle = "Blue";
    towers.forEach(tower => {
        context.beginPath();
        context.arc(tower.x, tower.y, 10, 0, Math.PI * 2);
        context.fill();

        // Tegn rækkevidde (valgfrit)
        context.strokeStyle = "rgba(0, 0, 0, 0.3)";
        context.beginPath();
        context.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
        context.stroke();
    });
}

function updateTowers() {


    towers.forEach(tower => {
        soldiers.forEach(enemy => {
            tower.attack(enemy);
            if (enemy.health <= 0) {
                soldiers.splice(soldiers.indexOf(enemy), 1);
                highscore += 10;
                gold += enemy.gainGold;

            }
        });
    });
}

let towers = [];


export { Tower, placeTower, updateTowers, renderTowers, towers };