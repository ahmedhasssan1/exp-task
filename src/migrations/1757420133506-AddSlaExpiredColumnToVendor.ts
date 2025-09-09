import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlaExpiredColumnToVendor implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE vendor 
            ADD COLUMN sla_expired BOOLEAN DEFAULT FALSE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE vendor 
            DROP COLUMN sla_expired;
        `);
  }
}
