CREATE OR REPLACE TRIGGER trg_foliador_eon
BEFORE INSERT OR UPDATE OF id_eon ON fosiles.eones
FOR EACH ROW

BEGIN
    
    :NEW.id_eon := eon_id.nextval;
    
END;