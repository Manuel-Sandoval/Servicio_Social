CREATE OR REPLACE TRIGGER trg_foliador_epocas
BEFORE INSERT OR UPDATE OF id_epoca ON fosiles.epocas
FOR EACH ROW

BEGIN
    
    :NEW.id_epoca := epoca_id.nextval;
    
END;