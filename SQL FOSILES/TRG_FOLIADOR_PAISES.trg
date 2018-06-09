CREATE OR REPLACE TRIGGER trg_foliador_paises
BEFORE INSERT OR UPDATE OF id_pais ON fosiles.paises
FOR EACH ROW

BEGIN
    
    :NEW.id_pais := pais_id.nextval;
    
END;