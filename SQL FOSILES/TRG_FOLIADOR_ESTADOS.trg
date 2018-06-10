CREATE OR REPLACE TRIGGER trg_foliador_estados
BEFORE INSERT OR UPDATE OF id_estado ON fosiles.estados
FOR EACH ROW

BEGIN
    
    :NEW.id_estado := estado_id.nextval;

END;