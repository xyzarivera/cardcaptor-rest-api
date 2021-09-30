import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * consider Clow and Sakura versions
 */

@Entity({ name: "sakura_cards" /* Relation name in database */ })
class SakuraCard {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public cardName: string;

  @Column()
  public isMainCard: boolean;

  @Column({ nullable: true })
  public attribute: string;

  @Column()
  public sign: string;

  @Column()
  public magicType: string;

  @Column()
  public captureOrderAnime: number;

  @Column({ nullable: true })
  public captureOrderManga: number;

  @Column()
  public transformOrderAnime: number;

  @Column({ nullable: true })
  public transformOrderManga: number;

  @Column({ nullable: true })
  public clowCardForm: string;

  @Column({ nullable: true })
  public sakuraCardForm: string;
}

export default SakuraCard;
