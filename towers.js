export class Tower {
    constructor(x, y, range, damage, cost) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.damage = damage;
        this.cost = cost;
    }

    attack(enemy) {
        // Calculate distance from tower to enemy
        const distance = Math.sqrt(Math.pow(enemy.x - this.x, 2) + Math.pow(enemy.y - this.y, 2));

        if (distance <= this.range) {
            enemy.health -= this.damage;
        }
    }
}