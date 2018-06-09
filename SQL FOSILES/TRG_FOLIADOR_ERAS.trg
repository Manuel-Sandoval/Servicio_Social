CREATE OR REPLACE TRIGGER trg_foliador_eras
BEFORE INSERT OR UPDATE OF id_era ON fosiles.eras
FOR EACH ROW

BEGIN
    
    :NEW.id_era := era_id.nextval;
    
END;