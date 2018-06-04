CREATE OR REPLACE TRIGGER trg_foliador_fosiles
BEFORE INSERT ON fosiles.fosiles
FOR EACH ROW

BEGIN
    
    :NEW.id_fosil := fosiles_id.nextval;
    
END;